import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {
  orderId: string;

  constructor(private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
