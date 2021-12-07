import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dropzone } from 'dropzone';

export interface ProfileData {
  domain: string;
  validated: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  public isConnected: boolean;
  public connectedDomain: string;
  public profile: ProfileData;
  public tokens:  number;
  public actualBet: number;
  public highestBidder: boolean;

  public dropzone;

  ngOnInit() {
    this.tokens = 0;
    this.actualBet = 364;
    this.highestBidder = false;
    this.isConnected = false;
    this.connectedDomain = '';
    this.profile = {
      domain : '',
      validated: false
    };
  }

  openMetamaskDialog() {
    const dialogRef = this.dialog.open(DialogConnectMetamask);
 
    dialogRef.afterClosed().subscribe(result => {
      this.isConnected = result;

      setTimeout(() => this.reward(1000, 'Nice to meet you! Connection Reward: 1000 TLDT'), 2000);
      setTimeout(() => {
        this.setupDropzone();
        this.startCountdown();
      }, 1);
    });
  }

  setupDropzone() {
    this.dropzone = new Dropzone("#upload")
      
    const output = document.querySelector("#output");

    this.dropzone.on("addedfile", (file) => {
      // Add an info line about the added file for each file.
      output.innerHTML += `<div>File added: ${file.name}</div>`;
    });
  }

  startCountdown() {
      // Set the date we're counting down to
      var countDownDate = new Date().getTime() + (3*60*60*1000);
      
      // Update the count down every 1 second
      var x = setInterval(function() {
      
        // Get today's date and time
        var now = new Date().getTime();
      
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
      
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        // Display the result in the element with id="demo"
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
      
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "EXPIRED";
        }
      }, 1000);
    }

  openProfileDialog() {

    const dialogRef = this.dialog.open(DialogProfile, {
      data: this.profile
    });

    dialogRef.afterClosed().subscribe(result => {
      result
    });
  }

  reward(reward:number, text?:string) {
    this.tokens += reward;
    let msg = text ? text : `Congratulation! You achived ${reward} TLDT`;
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
  }

  bet(bet:number) {
    if(bet > this.tokens) {
      this.notEnoughTokens();
      return;
    }

    bet > this.actualBet ? this.acceptBet(bet): this.declineBet(bet);
  }

  acceptBet(bet:number) {
    this.actualBet = bet;
    this.tokens -= bet;
    this.highestBidder = true;

    let msg = `Congratulation! You are the highest bidder with ${bet} TLDT!`;
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });

    setTimeout(() => this.someBetMore(), 12000);
  }

  someBetMore() {
    this.highestBidder = false;
    this.actualBet++;
    
    this._snackBar.open('Oh shit! Someone bet more than you :(', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
  }

  notEnoughTokens() {
    this._snackBar.open('Sorry but you need more ToLeDo-Tokens for that bet!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
  }

  declineBet(bet:number) {
    let difference = this.actualBet - bet + 1;
    let msg = `Sorry but you need to bet ${difference} more Token!`;
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

@Component({
  selector: 'dialog-profile',
  templateUrl: 'dialog-profile.html',
})
export class DialogProfile {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;


  constructor(@Inject(MAT_DIALOG_DATA) public data: ProfileData, private _snackBar: MatSnackBar) {
    console.log(data);
  }

  saveDomain(domain:string) {
    console.log(domain);
    this.data.domain = domain;

    if(domain) {
      this._snackBar.open(`thx for your Subsciption!`, '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000
      });
    }
  }

  validate() {

    if(this.data.domain) {
      this.data.validated = true;

      this._snackBar.open(`WOW you getting crazy! All is set up. Tokens are incoming`, '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000
      });
    } else {
      this._snackBar.open(`Please register insert first your domain`, '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000
      });
    }
  }
}