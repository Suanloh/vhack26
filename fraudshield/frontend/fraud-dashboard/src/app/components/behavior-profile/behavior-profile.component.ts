
import { Component, OnInit, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ApiService } from '../../core/api.service';
import { UserProfile } from '../../shared/models/user-profile.model';

@Component({
  selector: 'app-behavior-profile',
  templateUrl: './behavior-profile.component.html',
  styleUrls: ['./behavior-profile.component.css']
})
export class BehaviorProfileComponent implements OnInit {
  @Input() userId: string = 'user_1'; // Default user for demo
  userProfile: UserProfile;
  spendingChartOption: EChartsOption;
  deviceChartOption: EChartsOption;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserProfile(this.userId).subscribe(profile => {
      this.userProfile = profile;
      this.setupCharts();
    });
  }

  setupCharts(): void {
    this.spendingChartOption = {
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center', textStyle: { color: '#fff' } },
      series: [{
        name: 'Spending',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false },
        data: Object.entries(this.userProfile.spending_distribution).map(([name, value]) => ({ name, value }))
      }]
    };

    this.deviceChartOption = {
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center', textStyle: { color: '#fff' } },
      series: [{
        name: 'Device Usage',
        type: 'pie',
        radius: '50%',
        data: Object.entries(this.userProfile.device_usage_breakdown).map(([name, value]) => ({ name, value }))
      }]
    };
  }
}
