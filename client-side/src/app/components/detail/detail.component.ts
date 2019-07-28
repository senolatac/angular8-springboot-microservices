import { Component, OnInit } from '@angular/core';
import {Course} from '../../models/course';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  courseId: number;
  currentCourse: Course;
  studentList: Array<string>;

  constructor(private courseService: CourseService, private route: ActivatedRoute) { 
    this.currentCourse = JSON.parse(localStorage.getItem('currentCourse'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')) {
        this.courseId = Number.parseInt(params.get('id'));
        this.findStudentsOfCourse();
      }
    });
  }

  findStudentsOfCourse() {
    this.courseService.findStudentsOfCourse(this.courseId).subscribe(data => {
      this.studentList = data;
    });
  }

}
