import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://api.keystone-adventures.com';

  constructor(public http: HttpClient) {

    // TODO during development adjust the url automatically
    if (location.hostname.indexOf('localhost') !== -1) {
      this.url = 'http:///localhost/kaapi';
    } else {
      this.url = 'https://api.keystone-adventures.com';
    }

  }

  /**
   * Get data from a remote server.
   * @param endpoint it can be a full URL like https://api.github.com/users or
   * just an string representing an endpoint. The second case will be interpreted like an endpoint for the main
   * API at https://api.keystone-adventures.com
   * @param params support easy query params for GET requests.
   * @param reqOpts an object with options to configure the HttpRequest object.
   */
  get(endpoint: string, params?: any, reqOpts?: any) {

    /* Allow both full URLs and endpoints for main API https://stackoverflow.com/a/19709846/2557030 */
    const url = endpoint.includes('http://') ||
      endpoint.includes('https://') ? endpoint : (this.url + '/' + endpoint);

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      // TSLint complains about for (... in ...)
      // https://stackoverflow.com/a/43083415/2557030
      for (const k of Object.keys(params)) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(url, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  /**
   * Checks if the headers indicate that there is a nex page of results.
   * @param headers an HttpHeaders object
   */
  hasNextPage(headers: HttpHeaders): boolean {
    return headers.get('link').includes('rel=next');
  }

  nextPageUrl(headers: HttpHeaders): string {
    const links = headers.get('link').split(',');
    let next = links.find(l => l.includes('rel=next') );
    next = next.split(';')[0];
    next = next.replace(/[<>]/gi, '');
    return next;
  }

}
