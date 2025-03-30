package com.example.Student.Management.System.repo;

import com.example.Student.Management.System.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // You can define custom query methods if needed
}

