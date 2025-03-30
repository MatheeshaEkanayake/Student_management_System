package com.example.Student.Management.System.controller;

import com.example.Student.Management.System.Service.CourseService;
import com.example.Student.Management.System.model.Course;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



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

    @DeleteMapping("/{courseId}/students/{studentId}")
    public ResponseEntity<Void> removeStudentFromCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
        courseService.removeStudentFromCourse(courseId, studentId);
        return ResponseEntity.ok().build();
    }

}

