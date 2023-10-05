import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/core/models/confirm-dialog-data';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  
  public  title:string;
  public  message:string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData)
    
    {
      this.title = data.title;
      this.message = data.message;
              
    }

    ngOnInit() {

    }
    
    onConfirm(): void {
        // Close the dialog, return true
        this.dialogRef.close(true);
    }
    
    onDismiss(): void {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }




}
