package com.kingsman.Kingsman.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id) {super("Could Not Found Customer with id"+id);

    }

}
