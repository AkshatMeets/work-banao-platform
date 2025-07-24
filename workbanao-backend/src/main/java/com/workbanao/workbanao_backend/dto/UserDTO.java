package com.workbanao.workbanao_backend.dto;

import com.workbanao.workbanao_backend.entity.enums.Role;

public class UserDTO {
    public Long id;
    public String name;
    public String email;
    public String phoneNumber;
    public String location;
    public Role role;
}
