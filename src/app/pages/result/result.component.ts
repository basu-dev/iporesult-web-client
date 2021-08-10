import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IpoResult } from 'src/app/services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
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
  error = false;
  ipoName = "";

  ngOnInit(): void {
    this.ipoName = this.apiService.getIpoById(this.id)?.name || '';
    this.loadResult();
  }
  loadResult() {
    this.apiService.getResult(this.id).subscribe(
      data => {
        this.error = false;
        this.ipoResults = data;
      },
      (err: any) => {
        this.error = true;
        console.log(err);
      }
    )
  }

}
