
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NgxEchartsModule } from 'ngx-echarts';

import { TransactionMonitorComponent } from './components/transaction-monitor/transaction-monitor.component';
import { RiskMeterComponent } from './components/risk-meter/risk-meter.component';
import { AiExplanationComponent } from './components/ai-explanation/ai-explanation.component';
import { FraudMapComponent } from './components/fraud-map/fraud-map.component';
import { BehaviorProfileComponent } from './components/behavior-profile/behavior-profile.component';
import { TrustScoreComponent } from './components/trust-score/trust-score.component';
import { FraudSimulatorComponent } from './components/fraud-simulator/fraud-simulator.component';
import { ProtectionWarningComponent } from './components/protection-warning/protection-warning.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { SimulatorComponent } from './pages/simulator/simulator.component';
import { MapPageComponent } from './pages/map-page/map-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionMonitorComponent,
    RiskMeterComponent,
    AiExplanationComponent,
    FraudMapComponent,
    BehaviorProfileComponent,
    TrustScoreComponent,
    FraudSimulatorComponent,
    ProtectionWarningComponent,
    DashboardComponent,
    AnalyticsComponent,
    SimulatorComponent,
    MapPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
