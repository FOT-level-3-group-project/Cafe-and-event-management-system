package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.dto.OrderDTO;
import com.kingsman.Kingsman.dto.OrderItemDTO;
import com.kingsman.Kingsman.exception.ResourceNotFoundException;
import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.model.FoodItem;
import com.kingsman.Kingsman.model.Order;
import com.kingsman.Kingsman.model.OrderItem;
import com.kingsman.Kingsman.repository.OrderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllWithOrderItems().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long orderId) {
        Order order = getOrderIfExists(orderId);
        return convertToDTO(order);
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = convertToEntity(orderDTO);
        setEmployeeForOrder(order, orderDTO.getEmployeeId());
        List<OrderItem> orderItems = createOrderItems(orderDTO.getOrderItems(), order);
        order.setOrderItems(orderItems);
        Order savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }

    public OrderDTO updateOrder(Long orderId, OrderDTO orderDTO) {
        Order existingOrder = getOrderIfExists(orderId);
        BeanUtils.copyProperties(convertToEntity(orderDTO), existingOrder, "orderId");
        List<OrderItem> orderItems = createOrderItems(orderDTO.getOrderItems(), existingOrder);
        existingOrder.setOrderItems(orderItems);
        return convertToDTO(orderRepository.save(existingOrder));
    }

    public void deleteOrder(Long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new ResourceNotFoundException("Order not found with id: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }

    public List<OrderDTO> getOrdersByCustomerId(Long customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        return mapOrderListToDTOList(orders);
    }

    public List<OrderDTO> getOrdersByEmployeeId(Long employeeId) {
        List<Order> orders = orderRepository.findByEmployeeId(employeeId);
        return mapOrderListToDTOList(orders);
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
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setEmployeeId(order.getEmployee().getId().longValue());
        BeanUtils.copyProperties(order, orderDTO);

        // Map order items
        List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
                .map(this::convertOrderItemToDTO)
                .collect(Collectors.toList());
        orderDTO.setOrderItems(orderItemDTOs);

        return orderDTO;
    }

    private OrderItemDTO convertOrderItemToDTO(OrderItem orderItem) {
        OrderItemDTO orderItemDTO = new OrderItemDTO();
        orderItemDTO.setFoodItemId(orderItem.getFoodItem().getFoodId());
        orderItemDTO.setQuantity(orderItem.getQuantity());
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
}
