import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as echarts from 'echarts';
import { Employee } from '../../Model/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavContainer, MatSidenav, MatIcon, MatListModule, MatToolbarModule, MatSidenavContent, RouterOutlet, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatSelectModule],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  ITEmployees: Employee[] = [];
  humanResources: Employee[] = [];
  finance: Employee[] = [];
  operations: Employee[] = [];
  marketing: Employee[] = [];
  sales: Employee[] = [];

  private pieChart: echarts.ECharts | null = null;
  private barChart: echarts.ECharts | null = null;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
      this.initBarCharts();
    }, 100);

    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((result: { matches: any }) => {
      setTimeout(() => {
        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'over';
        }
      });
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  navigateToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  initCharts() {
    const chartDom = document.getElementById('main');
    if (!chartDom) {
      console.error('Chart container with id "main" not found');
      return;
    }

    if (this.pieChart) {
      this.pieChart.dispose();
    }

    this.pieChart = echarts.init(chartDom);
    const option: echarts.EChartsOption = {
      title: {
        text: 'Employees Information',
        subtext: '2024-2025',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Departments',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.ITEmployees.length, name: 'Information Technology' },
            { value: this.humanResources.length, name: 'Human Resources' },
            { value: this.finance.length, name: 'Finance' },
            { value: this.sales.length, name: 'Sales' },
            { value: this.operations.length, name: 'Operations' },
            { value: this.marketing.length, name: 'Marketing' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    this.pieChart.setOption(option);
  }

  initBarCharts() {
    const chartDom = document.getElementById('barChart');
    if (!chartDom) {
      return;
    }

    if (this.barChart) {
      this.barChart.dispose();
    }

    this.barChart = echarts.init(chartDom);
    const option: echarts.EChartsOption = {
      title: {
        text: 'Talent Acquisition Platform',
        subtext: '2024-2025',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['LinkedIn', 'Naukri', 'Glassdoor', 'EdX', 'JobsForU']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70],
          type: 'bar'
        }
      ]
    };

    this.barChart.setOption(option);
    console.log('Bar chart initialized');
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employeesData: any) => {
        console.log('Received employee data:', employeesData);

        this.ITEmployees = employeesData.data.filter((employee: Employee) => {
          return employee.department === 'Information Technology';
        });

        this.humanResources = employeesData.data.filter((employee: Employee) => {
          return employee.department === 'Human Resources';
        });

        this.finance = employeesData.data.filter((employee: Employee) => {
          return employee.department === 'Finance';
        });

        this.operations = employeesData.data.filter((employee: Employee) => {
          return employee.department === 'Operations';
        });
        
        this.marketing = employeesData.data.filter((employee: Employee) => {
          return employee.department === 'Marketing';
        });

        this.sales = employeesData.data.filter((employee: Employee) => {
          return employee.department === 'Sales';
        });

        if (this.pieChart) {
          this.updatePieChart();
        }
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  private updatePieChart() {
    if (!this.pieChart) return;

    const option: echarts.EChartsOption = {
      series: [
        {
          data: [
            { value: this.ITEmployees.length, name: 'Information Technology' },
            { value: this.humanResources.length, name: 'Human Resources' },
            { value: this.finance.length, name: 'Finance' },
            { value: this.sales.length, name: 'Sales' },
            { value: this.operations.length, name: 'Operations' },
            { value: this.marketing.length, name: 'Marketing' }
          ]
        }
      ]
    };

    this.pieChart.setOption(option);
  }

  ngOnDestroy() {
    if (this.pieChart) {
      this.pieChart.dispose();
    }
    if (this.barChart) {
      this.barChart.dispose();
    }
  }
}