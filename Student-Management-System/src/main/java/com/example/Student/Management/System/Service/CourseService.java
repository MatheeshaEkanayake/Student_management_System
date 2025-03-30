package com.example.Student.Management.System.Service;


import com.example.Student.Management.System.model.Course;
import com.example.Student.Management.System.repo.CourseRepository;

import lombok.RequiredArgsConstructor;
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

}
