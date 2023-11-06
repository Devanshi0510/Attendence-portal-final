import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Students } from '../model/students';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../Services/students.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  public chart: Chart;

  constructor(private http: HttpClient, private studentsService :StudentsService) {}

  ngOnInit(): void {
    this.studentsService.getStudents()
      .subscribe(students => {
        const labels = [];
        const data = [];
        const presentCounts = {};

        students.forEach(student => {
          student.attendance.forEach(({ date, status }) => {
            if (status === 'present' || status === 'Present') {
              presentCounts[date] = presentCounts[date] ? presentCounts[date] + 1 : 1;
            }else if (!presentCounts[date]) {
              presentCounts[date] = 0;
            }
          });
        });

        Object.keys(presentCounts).forEach(date => {
          labels.push(date);
          data.push(presentCounts[date]);
        });

        this.createChart(labels, data);
      });
  }

  createChart(labels: string[], data: number[]) {
    const config = {
      type: 'bar' as const,
      data: {
        labels: labels,
        datasets: [{
          label: 'No of Students Present',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };
    this.chart = new Chart('myChart', config);
  }
}