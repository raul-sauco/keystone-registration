import { Component, OnInit } from '@angular/core';
import {TripService} from '../../services/trip/trip.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  private acceptedExtensions = [
    'aac', 'ai', 'aiff', 'avi', 'bmp', 'c', 'cpp', 'csv', 'dat', 'dmg', 'doc',
    'docx', 'dotx', 'dwg', 'dxf', 'eps', 'exe', 'flv', 'gif', 'h', 'hpp',
    'html', 'ics', 'iso', 'java', 'jpg', 'js', 'key', 'less', 'mid', 'mp3',
    'mp4', 'mpg', 'odf', 'ods', 'odt', 'otp', 'ots', 'ott', 'pdf', 'php',
    'png', 'ppt', 'psd', 'py', 'qt', 'rar', 'rb', 'rtf', 'sass', 'scss',
    'sql', 'tga', 'tgz', 'tiff', 'txt', 'wav', 'xls', 'xlsx', 'xml', 'yml', 'zip'
  ];

  constructor(
    private tripService: TripService
  ) { }

  ngOnInit() {
  }

  /**
   * Return the name of the icon to use for the file.
   */
  getIconExtension(extension: string): string {

    if (this.acceptedExtensions.indexOf(extension) === -1) {
      extension = '_blank';
    }

    return extension;
  }

}
