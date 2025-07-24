package com.workbanao.workbanao_backend.dto.mappers;

import com.workbanao.workbanao_backend.dto.UserDTO;
import com.workbanao.workbanao_backend.dto.UserRegisterRequest;
import com.workbanao.workbanao_backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDTO(User user){
        UserDTO dto = new UserDTO();
        dto.id=user.getId();
        dto.name=user.getName();
        dto.email=user.getEmail();
        dto.phoneNumber=user.getPhoneN0umber();
        dto.location=user.getLocation();
        dto.role=user.getRole();
        return dto;
    }
    public User toEntity(UserRegisterRequest request){
        User user=new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setPhoneN0umber(request.phoneNumber);
        user.setLocation(request.location);
        user.setRole(request.role);
        return user;
    }
}
