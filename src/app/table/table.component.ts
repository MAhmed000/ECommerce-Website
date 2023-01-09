import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['productname', 'Category', 'Date', 'Condition','Price','Comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private services:ApiService,
                private dialog:MatDialog) { }

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

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Edit(row:any){

    this.dialog.open(DialogComponent,{
      width:"30%",
      data:row
    }).afterClosed().subscribe(d=>{
      if(d=="Save"){
        this.getAllRec();
      }
    })
  }
  DeleteProduct(row:any){
    this.services.DeleteProduct(row.id).subscribe({
      next:(d)=>{
        alert("Record Deleted Successfully....!");
        this.getAllRec();
      },error:()=>{
        alert("Record Not Deletd....!");
      }
    })
  }
}
