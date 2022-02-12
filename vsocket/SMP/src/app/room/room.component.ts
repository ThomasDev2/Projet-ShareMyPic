import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
  public id:number=0;

  constructor(private route: ActivatedRoute, private router: Router) { 
    router.events.subscribe((val) => {
      this.id= +this.route.snapshot.paramMap.get('id')!;
    });
  }

  ngOnInit(): void {
  }

}

