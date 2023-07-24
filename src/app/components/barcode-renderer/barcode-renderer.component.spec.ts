import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeRendererComponent } from './barcode-renderer.component';

describe('BarcodeRendererComponent', () => {
  let component: BarcodeRendererComponent;
  let fixture: ComponentFixture<BarcodeRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarcodeRendererComponent]
    });
    fixture = TestBed.createComponent(BarcodeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
