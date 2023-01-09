import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private dialog:MatDialog,private services:ApiService) { }

  ngOnInit(): void {
    this.getAllRec();
  }


  getAllRec(){
    this.services.getAllProduct().subscribe({
      next:(rec)=>{
        this.dataSource=new MatTableDataSource(rec);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },error:()=>{
        alert("Error Occur....!");
      }
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(d=>{
      if(d=="ADD"){
        this.getAllRec();
      }
    });
  }

}
