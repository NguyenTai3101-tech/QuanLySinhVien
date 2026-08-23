package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    // 1. Lấy danh sách toàn bộ sinh viên
    @GetMapping
    public ResponseEntity<List<Student>> getAll() {
        List<Student> students = studentRepository.findAll();
        return ResponseEntity.ok(students);
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
    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable Long id,@RequestBody Student newInfo){
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null){
            return ResponseEntity.badRequest().body("Không tồn tại tài khoản này");
        }
        student.setName(newInfo.getName());
        student.setStudentId(newInfo.getStudentId());
        student.setSchool(newInfo.getSchool());
        studentRepository.save(student);
        return ResponseEntity.ok("Cập nhật thông tin cá nhân thành công");
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudent(@PathVariable Long id){
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null){
            return ResponseEntity.badRequest().body("Không tồn tại tài khoản");
        }
        return ResponseEntity.ok(student);
    }
}
