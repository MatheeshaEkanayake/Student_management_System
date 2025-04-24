package com.example.Student.Management.System.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Student.Management.System.model.Student;
import com.example.Student.Management.System.repo.StudentRepository;

import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;


    public Student addStudent(Student student, MultipartFile imageFile) throws IOException {
        
            student.setImageName(imageFile.getOriginalFilename());
            student.setImageType(imageFile.getContentType());
            student.setImage(imageFile.getBytes());
        
        return studentRepository.save(student);
    }


    public Student updateStudent(Long id, Student studentDetails, MultipartFile imageFile) throws IOException {
        return studentRepository.findById(id).map(student -> {
            student.setFirstName(studentDetails.getFirstName());
            student.setLastName(studentDetails.getLastName());
            student.setAddress(studentDetails.getAddress());
            student.setDateOfBirth(studentDetails.getDateOfBirth());
            student.setEmail(studentDetails.getEmail());
            student.setDegreeProgram(studentDetails.getDegreeProgram());

            if (imageFile != null && !imageFile.isEmpty()) {
                try {
                    student.setImageName(imageFile.getOriginalFilename());
                    student.setImageType(imageFile.getContentType());
                    student.setImage(imageFile.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException("Error processing image file", e);
                }
            }

            return studentRepository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found"));
    }

     // Get all students

     public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Search students by first name (case-insensitive)

    public List<Student> searchStudentsByName(String name) {
        return studentRepository.findByFirstNameContainingIgnoreCase(name);
    }

    // Delete student by ID
    public void deleteStudent(Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Student not found with ID: " + id);
        }
    }
}
