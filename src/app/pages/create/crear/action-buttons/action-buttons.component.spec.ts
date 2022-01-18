import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';

import {ActionButtonsComponent} from './action-buttons.component';

import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader} from "@angular/cdk/testing";
import {MatButtonHarness} from "@angular/material/button/testing";

describe('ActionButtonsComponent', () => {
  let component: ActionButtonsComponent;
  let fixture: ComponentFixture<ActionButtonsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionButtonsComponent ],
      providers: [ConfirmationService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsComponent);
    component = fixture.componentInstance;
    component.disableSend = true;
    component.disableValidation = true;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 buttons', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toEqual(3)
  });

  it('should have a Validate Button disabled', async () => {
    const buttons = await loader.getHarness(MatButtonHarness.with({text: 'Validar'}));
    expect(await buttons.isDisabled()).toBe(true);
  });

  it('should have a Validate Button enabled', async () => {
    component.disableValidation = false;
    fixture.detectChanges();
    const buttons = await loader.getHarness(MatButtonHarness.with({text: 'Validar'}));
    expect(await buttons.isDisabled()).toBe(false);
  });

  it('should have a Send Button disabled', async () => {
    const buttons = await loader.getHarness(MatButtonHarness.with({text: 'Enviar'}));
    expect(await buttons.isDisabled()).toBe(true);
  });

  it('should have a Send Button enabled', async () => {
    component.disableSend = false;
    fixture.detectChanges();
    const buttons = await loader.getHarness(MatButtonHarness.with({text: 'Enviar'}));
    expect(await buttons.isDisabled()).toBe(false);
  });

  it('should call validar when Validar button clicked', async () => {
    component.disableValidation = false;
    fixture.detectChanges();
    const spySubscribable = spyOn(component, 'validar');
    const button = await loader.getHarness(MatButtonHarness.with({text: 'Validar'}));
    // expect(fixture.componentInstance.confirmed).toBe(false);
    expect(await button.isDisabled()).toBe(false);
    await button.click();
    expect(spySubscribable).toHaveBeenCalled();
  });

  it('should call limpiarData when Limpiar button clicked', async () => {
    const spySubscribable = spyOn(component, 'limpiarData');
    const button = await loader.getHarness(MatButtonHarness.with({text: 'Limpiar'}));
    // expect(fixture.componentInstance.confirmed).toBe(false);
    expect(await button.isDisabled()).toBe(false);
    await button.click();
    expect(spySubscribable).toHaveBeenCalled();
  });

});
