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
    );
  }

  id!: number;
  ipoResults!: IpoResult[];
  errorType: 'no-user' | 'user-offline' | 'server-error' | null = null;
  ipoName = "";

  ngOnInit(): void {
    this.ipoName = this.apiService.getIpoById(this.id)?.name || '';
    this.loadResult();
  }
  loadResult() {
    this.apiService.getResult(this.id).subscribe(
      data => {
        this.errorType = null;
        this.ipoResults = data;
      },
      (err: any) => {
        console.log(err);
        if (err.type && err.type == 'no-user') {
          this.errorType = 'no-user';
        }
        else if (err.status == 0) {
          this.errorType = 'user-offline';
        } else {
          this.errorType = 'server-error';
        }
      }
    );
  }

}
