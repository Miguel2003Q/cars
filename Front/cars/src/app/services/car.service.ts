import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  photoUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car);
  }

  deleteCar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' });
  }

  searchCars(query: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
  }

  filterCarsByYear(year: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/by-year/${year}`);
  }

  filterCarsByBrand(brand: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/by-brand/${encodeURIComponent(brand)}`);
  }

  uploadCarPhoto(id: number, file: File): Observable<{message: string, imageUrl: string}> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{message: string, imageUrl: string}>(`${this.apiUrl}/${id}/upload-photo`, formData);
  }

  updateCarPhoto(id: number, file: File): Observable<{message: string, imageUrl: string}> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.put<{message: string, imageUrl: string}>(`${this.apiUrl}/${id}/update-photo`, formData);
  }

  deleteCarPhoto(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}/delete-photo`);
  }

  getCarPhoto(id: number): Observable<{imageUrl?: string, message?: string}> {
    return this.http.get<{imageUrl?: string, message?: string}>(`${this.apiUrl}/${id}/photo`);
  }
}
