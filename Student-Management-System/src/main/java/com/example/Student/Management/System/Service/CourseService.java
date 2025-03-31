package com.example.Student.Management.System.Service;


import com.example.Student.Management.System.model.Course;
import com.example.Student.Management.System.repo.CourseRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CourseService {
    
    private final CourseRepository courseRepository;


    // Create a new course
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    // Add student to a course
    public void addStudentToCourse(Long courseId, Long studentId) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        course.getStudentIds().add(studentId);
        courseRepository.save(course);
    }

    // Remove student from a course
    public void removeStudentFromCourse(Long courseId, Long studentId) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        course.getStudentIds().remove(studentId);
        courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Long> getAllStudentId(Long courseId) {
        Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));
        return course.getStudentIds();    }


    public void removeCourse(Long courseId) {
        if (courseRepository.existsById(courseId)) courseRepository.deleteById(courseId);
        else {
            throw new RuntimeException("Student not found with ID: " + courseId);
        }
    }


}
