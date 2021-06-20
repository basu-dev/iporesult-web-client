import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService, IpoResult} from 'src/app/services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.route.params.subscribe(
      data => this.id = data['id'] as number
    )
  }
  id!: number;
  ipoResults!: IpoResult[];
  ngOnInit(): void {
    this.loadResult();
  }
  loadResult() {
    console.log('clicked')
    this.apiService.getResult(this.id).subscribe(
      data => this.ipoResults = data,
      (err: any) => console.log(err)
    )
  }

}
