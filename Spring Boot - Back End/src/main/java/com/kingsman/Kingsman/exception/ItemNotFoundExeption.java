package com.kingsman.Kingsman.exception;

public class ItemNotFoundExeption extends RuntimeException{

    public ItemNotFoundExeption(long itemId) {
        super("Item Not found with Id: "+ itemId);
    }
}