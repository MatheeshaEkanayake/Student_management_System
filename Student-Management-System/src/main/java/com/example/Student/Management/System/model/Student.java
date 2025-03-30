package com.example.Student.Management.System.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Table(name = "students")
@Getter
@Setter
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String address;
    private Date dateOfBirth;
    private String email;

    @Enumerated(EnumType.STRING)
    private DegreeProgram degreeProgram;

    private String imageName;
    private String imageType;

    @Lob
    private byte[] image;

    public enum DegreeProgram {
        COMPUTER_SCIENCE, ENGINEERING, BUSINESS, MEDICINE, ARTS
    }
}

