import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 2;

  public isConnected: false;
  public tokens =  0;

  openMetamaskDialog() {
    const dialogRef = this.dialog.open(DialogConnectMetamask);

    dialogRef.afterClosed().subscribe(result => {
      this.isConnected = result;

      setTimeout(() => this.reward(1000, 'Nice to meet you! Connection Reward: 1000 TLDT'), 2000);
    });
  }

  reward(reward:number, text?:string) {
    this.tokens += reward;
    let msg = text ? text : `Congratulation! You achived ${this.tokens} TLDT`;
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
  }
}

@Component({
  selector: 'dialog-connect-metamask',
  templateUrl: 'dialog-connect-metamask.html',
})
export class DialogConnectMetamask {}