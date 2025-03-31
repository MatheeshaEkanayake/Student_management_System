package com.example.Student.Management.System.controller;

import com.example.Student.Management.System.Service.CourseService;
import com.example.Student.Management.System.model.Course;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseService.createCourse(course));
    }

    @PostMapping("/{courseId}/students/{studentId}")
    public ResponseEntity<Void> addStudentToCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
        courseService.addStudentToCourse(courseId, studentId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{courseId}/students/delete/{studentId}")
    public ResponseEntity<Void> removeStudentFromCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
        courseService.removeStudentFromCourse(courseId, studentId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{courseId}")
    public ResponseEntity<Void> removeourse(@PathVariable Long courseId) {
        courseService.removeCourse(courseId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/all")
    public List<Course> getCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{courseId}/all")
    public List<Long> getStudentId(@PathVariable Long courseId) {
        return courseService.getAllStudentId(courseId);
    }
    
    

}

