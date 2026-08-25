package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public ResponseEntity<List<Student>> getAll() {
        List<Student> students = studentRepository.findAll();
        return ResponseEntity.ok(students);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {
        if (studentRepository.existsByEmail(student.getEmail())) {
            return ResponseEntity.badRequest().body("Tài khoản đã tồn tại");

        }
        Student savedStudent = studentRepository.save(student);


        return ResponseEntity.ok(savedStudent);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Student student) {
        Student existStudent = studentRepository.findByEmail(student.getEmail());
        if (existStudent != null && existStudent.getPassword().equals(student.getPassword())) {
            return ResponseEntity.ok("Chúc mừng bạn đăng nhập thành công");
        }
        return ResponseEntity.badRequest().body("Đăng nhập thất bại");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable Long id, @RequestBody Student newInfo) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null) {
            return ResponseEntity.badRequest().body("Không tồn tại tài khoản này");
        }
        student.setName(newInfo.getName());
        student.setStudentId(newInfo.getStudentId());
        student.setSchool(newInfo.getSchool());
        studentRepository.save(student);
        return ResponseEntity.ok("Cập nhật thông tin cá nhân thành công");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudent(@PathVariable Long id) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null) {
            return ResponseEntity.badRequest().body("Không tồn tại tài khoản");
        }
        return ResponseEntity.ok(student);
    }

    @PatchMapping("/{id}/score")
    public ResponseEntity<?> updateScore(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null) {
            return ResponseEntity.badRequest().body("Không tồn tại sinh viên này");
        }
        if (updates.containsKey("maths")) {
            student.setMaths(Double.parseDouble(updates.get("maths").toString()));
        }
        if (updates.containsKey("physics")) {
            student.setPhysics(Double.parseDouble(updates.get("physics").toString()));
        }
        if (updates.containsKey("chemistry")) {
            student.setChemistry(Double.parseDouble(updates.get("chemistry").toString()));
        }
        if (updates.containsKey("literature")) {
            student.setLiterature(Double.parseDouble(updates.get("literature").toString()));
        }
        studentRepository.save(student);
        return ResponseEntity.ok(student);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        if (!studentRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Không tồn tại sinh viên");
        }
        studentRepository.deleteById(id);
        return ResponseEntity.ok("Xóa thành công");
    }
}
