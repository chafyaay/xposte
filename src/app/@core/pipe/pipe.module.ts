import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordPipePipe } from './password-pipe.pipe';

@NgModule({
  declarations: [PasswordPipePipe],
  exports: [PasswordPipePipe],
  imports: [CommonModule],
})
export class PipeModule {}
