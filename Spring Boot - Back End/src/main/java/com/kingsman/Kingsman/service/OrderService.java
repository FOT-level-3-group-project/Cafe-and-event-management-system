package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.dto.CustomerDTO;
import com.kingsman.Kingsman.dto.OrderDTO;
import com.kingsman.Kingsman.dto.OrderEmployeeFoodDTO;
import com.kingsman.Kingsman.dto.OrderItemDTO;
import com.kingsman.Kingsman.exception.ResourceNotFoundException;
import com.kingsman.Kingsman.model.*;
import com.kingsman.Kingsman.repository.OrderItemRepository;
import com.kingsman.Kingsman.repository.OrderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private FoodItemService foodItemService;

    @Autowired
    private NotificationService notificationService;
    private final OrderRepository orderRepository;

    private final OrderItemRepository orderItemRepository;
    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, CustomerService customerService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerService = customerService;
    }

    public List<OrderDTO> getAllOrders() { //This method retrieves all orders from the repository and maps them to a list of OrderDTO objects.
        List<Order> orders = orderRepository.findAll(); // Fetch all orders
        return mapOrderListToDTOList(orders);
    }

    public OrderDTO getOrderById(Long orderId) {// Given an orderId, this method retrieves the corresponding order from the repository
                                                 // (if it exists) and converts it to an OrderDTO.
        Order order = getOrderIfExists(orderId);
        return convertToDTO(order);
    }

    public List<OrderDTO> getOrdersByOrderStatus(String orderStatus) {
        List<Order> orders = orderRepository.findByOrderStatusOrderByOrderDateTimeDesc(orderStatus);
        return mapOrderListToDTOList(orders);
    }//This method fetches orders based on their status (e.g., “pending,” “completed,” etc.).
    // It returns a list of order data transfer objects.

    public List<OrderDTO> getOrdersByPaymentStatus(boolean paymentStatus) {
        List<Order> orders = orderRepository.findByPaymentStatusOrderByOrderDateTimeDesc(paymentStatus);
        return mapOrderListToDTOList(orders);
    }


    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = convertToEntity(orderDTO);

        setEmployeeForOrder(order, orderDTO.getEmployeeId());
        List<OrderItem> orderItems = createOrderItems(orderDTO.getOrderItems(), order);
        order.setOrderItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        //crate notification for chef
        createNotificationForChef(savedOrder);

        return convertToDTO(savedOrder);
    }

    //create the notification when place the order
    private void createNotificationForChef(Order order) {
        String title = "New Order";
        String message = "Order ID: " + order.getOrderId() + ", Table Number : " + order.getTableNumber() + " " + order.getOrderItems();
        boolean isRead = false;
        LocalDateTime createdAt = LocalDateTime.now();
        LocalDateTime updatedAt = createdAt;
        String forWho = "chef";

        Notification notification = new Notification(title, message, isRead, createdAt, updatedAt, forWho);
        notificationService.createNotification(notification);
    }

    public OrderDTO updateOrder(Long orderId, OrderDTO orderDTO) {
        // Fetch existing order
        Order existingOrder = getOrderIfExists(orderId);

        // Update order details
        updateOrderWithDTO(existingOrder, orderDTO);

        // Update order items
        updateOrderItems(existingOrder, orderDTO.getOrderItems());

        // Save
        Order updatedOrder = orderRepository.save(existingOrder);

        return convertToDTO(updatedOrder);
    }

    private void updateOrderItems(Order existingOrder, List<OrderItemDTO> updatedOrderItems) {

        Map<Long, OrderItem> existingOrderItemsMap = existingOrder.getOrderItems().stream()
                .collect(Collectors.toMap(OrderItem::getOrderItemId, Function.identity()));


        for (OrderItemDTO updatedOrderItem : updatedOrderItems) {
            Long orderItemId = updatedOrderItem.getOrderItemId();

            // If the updated order item exists in the map, update its quantity
            if (existingOrderItemsMap.containsKey(orderItemId)) {
                OrderItem existingOrderItem = existingOrderItemsMap.get(orderItemId);
                existingOrderItem.setQuantity(updatedOrderItem.getQuantity());

                // Remove the updated order item from the map
                existingOrderItemsMap.remove(orderItemId);
            } else {
                // If the updated order item doesn't exist in the map, create a new one
                OrderItem newOrderItem = convertToEntity(updatedOrderItem, existingOrder);
                existingOrder.getOrderItems().add(newOrderItem);
                System.out.println("New order item added: " + newOrderItem);
            }
        }

        // Delete order items that are not present in the updated order items
        for (OrderItem orderItemToRemove : existingOrderItemsMap.values()) {
            orderItemRepository.delete(orderItemToRemove);
            System.out.println("Order item removed: " + orderItemToRemove);
        }
    }

    public void deleteOrder(Long orderId) {
        Order existingOrder = getOrderIfExists(orderId);

        // Delete the associated order items
        List<OrderItem> orderItems = existingOrder.getOrderItems();
        for (OrderItem orderItem : orderItems) {
            orderItemRepository.deleteById(orderItem.getOrderItemId());
        }
        // Then delete the order
        orderRepository.deleteById(orderId);
    }

    public void deleteOrderItem(Long orderItemId) {
        // Find the order item by its ID
        System.out.println("Deleted order item with ID : " + orderItemId);

        OrderItem orderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Order item not found with id: " + orderItemId));

        // Delete the order item
        orderItemRepository.delete(orderItem);
    }



    public List<OrderDTO> getOrdersByCustomerId(Long customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        return mapOrderListToDTOList(orders);
    }

    public List<OrderDTO> getOrdersByEmployeeId(Long employeeId) {
        List<Order> orders = orderRepository.findByEmployeeId(employeeId);
        return mapOrderListToDTOList(orders);
    }

    private void updateOrderWithDTO(Order existingOrder, OrderDTO orderDTO) {
        // Update order details with new information from the DTO
        BeanUtils.copyProperties(orderDTO, existingOrder);
        existingOrder.setUpdatedDate(LocalDateTime.now());
    }

    private List<OrderDTO> mapOrderListToDTOList(List<Order> orders) {
        return orders.isEmpty() ? Collections.emptyList() :
                orders.stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
    }

    private Order getOrderIfExists(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
    }

    private void setEmployeeForOrder(Order order, Long employeeId) {
        if (employeeId == null) {
            throw new IllegalArgumentException("Employee ID is required for creating an order.");
        }
        Employee employee = new Employee();
        employee.setId(Math.toIntExact(employeeId));
        order.setEmployee(employee);
    }


    private List<OrderItem> createOrderItems(List<OrderItemDTO> orderItemDTOs, Order order) {
        return orderItemDTOs.stream()
                .map(itemDTO -> convertToEntity(itemDTO, order))
                .collect(Collectors.toList());
    }                                       // orde ewa anith paththata deno wger dto eka thiyana

    private OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        // Copy existing properties
        orderDTO.setEmployeeId(order.getEmployee().getId().longValue());
        BeanUtils.copyProperties(order, orderDTO);

        // Map order items
        List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
                .map(this::convertOrderItemToDTO)
                .collect(Collectors.toList());
        orderDTO.setOrderItems(orderItemDTOs);   // ena tika okkoma list eka map ekata dana eka

        // Fetch and set customer details if customerId is not null
        if (order.getCustomerId() != null) {
            CustomerDTO customerDTO = customerService.findById(order.getCustomerId());
            orderDTO.setCustomer(customerDTO);
        }

        return orderDTO;
    }



    private OrderItemDTO convertOrderItemToDTO(OrderItem orderItem) {
        OrderItemDTO orderItemDTO = new OrderItemDTO();
        orderItemDTO.setOrderItemId(orderItem.getOrderItemId());
        orderItemDTO.setFoodItemId(orderItem.getFoodItem().getFoodId());
        orderItemDTO.setFoodItemName(orderItem.getFoodItem().getFoodName());
        orderItemDTO.setQuantity(orderItem.getQuantity());
        orderItemDTO.setFoodPrice(orderItem.getFoodItem().getFoodPrice());
        return orderItemDTO;
    }



    private Order convertToEntity(OrderDTO orderDTO) {
        Order order = new Order();
        BeanUtils.copyProperties(orderDTO, order);
        return order;
    }

    private OrderItem convertToEntity(OrderItemDTO itemDTO, Order order) {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        FoodItem foodItem = new FoodItem();
        foodItem.setFoodId(itemDTO.getFoodItemId());
        orderItem.setFoodItem(foodItem);
        orderItem.setQuantity(itemDTO.getQuantity());
        return orderItem;
    }

    public List<OrderEmployeeFoodDTO> getOrderEmployeeFoodByCreatedDate(LocalDate createdDate) {
        List<OrderEmployeeFoodDTO> orderEmployeeFoodDTOs = orderRepository.getOrderEmployeeFoodByCreatedDate(createdDate);
        return orderEmployeeFoodDTOs;
    }

    public boolean updateOrderStatus(Long orderId, String orderStatus){

        Optional<Order> existingOrderOptional = orderRepository.findById(orderId);
        if (existingOrderOptional.isPresent()){
            Order existingOrder = existingOrderOptional.get();
            existingOrder.setOrderStatus(orderStatus);
            orderRepository.save(existingOrder);
        }
        return true;
    }

    public List<OrderEmployeeFoodDTO> getOrderEmployeeFoodByOrderStatus(String orderStatus) {
        List<OrderEmployeeFoodDTO> orderEmployeeFoodDTOs = orderRepository.getOrderEmployeeFoodByOrderStatus(orderStatus);
        return orderEmployeeFoodDTOs;
    }






}
