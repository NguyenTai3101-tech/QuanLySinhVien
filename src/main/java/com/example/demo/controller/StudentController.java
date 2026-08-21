package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAll(){
        return studentRepository.findAll();
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student){
        return studentRepository.save(student);
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Student student){
        if (studentRepository.existsByEmail(student.getEmail())){
            return ResponseEntity.badRequest().body("Tài khoản đã tồn tại");
            
        }
        studentRepository.save(student);
        return ResponseEntity.ok("Tạo tài khoản thành công");
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Student student){
        Student existStudent = studentRepository.findByEmail(student.getEmail());
        if(existStudent != null && existStudent.getPassword().equals(student.getPassword())){
            return ResponseEntity.ok("Chúc mừng bạn đăng nhập thành công");
        }
        return ResponseEntity.badRequest().body("Đăng nhập thất bại");
    }
}
