package com.kingsman.Kingsman.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderEmployeeFoodDTO {
    private Long OrderId;
    private int tableNumber;
    private String foodName;
    private String first_name; //employee first name
    private String orderStatus;
    private String cusName;

}
