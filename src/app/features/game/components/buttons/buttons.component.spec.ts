import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonsComponent } from './buttons.component';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('turnLeft', () => {
    spyOn(component.turnLeft, 'emit');
    component.doTurnLeft();
    expect(component.turnLeft.emit).toHaveBeenCalled();
  });

  it('turnRight', () => {
    spyOn(component.turnRight, 'emit');
    component.doTurnRight();
    expect(component.turnRight.emit).toHaveBeenCalled();
  });

  it('advance', () => {
    spyOn(component.advance, 'emit');
    component.doAdvance();
    expect(component.advance.emit).toHaveBeenCalled();
  });

  it('shoot', () => {
    spyOn(component.shoot, 'emit');
    component.doShoot();
    expect(component.shoot.emit).toHaveBeenCalled();
  });


});
