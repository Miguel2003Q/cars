import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService, Car } from '../../services/car.service';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cars',
  imports: [CommonModule, FormsModule],
  templateUrl: './cars.html',
  styleUrl: './cars.scss'
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  isLoading = false;
  errorMessage = '';
  searchQuery = '';
  selectedYear = '';
  selectedBrand = '';
  showAddForm = false;
  editingCar: Car | null = null;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isMobileMenuOpen = false;

  // Formulario para nuevo/editar carro
  carForm = {
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    color: ''
  };

  // Años disponibles (últimos 30 años)
  years: number[] = [];
  
  // Marcas populares
  brands = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz',
    'Audi', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Lexus',
    'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick', 'Chrysler', 'Dodge',
    'Jeep', 'Ram', 'GMC', 'Tesla', 'Porsche', 'Jaguar', 'Land Rover', 'Volvo'
  ];

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router
  ) {
    // Generar años disponibles
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 30; year--) {
      this.years.push(year);
    }
  }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.carService.getAllCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.filteredCars = cars;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar carros:', error);
        this.errorMessage = 'Error al cargar la lista de carros';
        this.isLoading = false;
      }
    });
  }

  searchCars() {
    if (!this.searchQuery.trim()) {
      this.filteredCars = this.cars;
      return;
    }

    this.carService.searchCars(this.searchQuery).subscribe({
      next: (cars) => {
        this.filteredCars = cars;
      },
      error: (error) => {
        console.error('Error en búsqueda:', error);
        this.errorMessage = 'Error en la búsqueda';
      }
    });
  }

  filterByYear() {
    if (!this.selectedYear) {
      this.filteredCars = this.cars;
      return;
    }

    this.carService.filterCarsByYear(parseInt(this.selectedYear)).subscribe({
      next: (cars) => {
        this.filteredCars = cars;
      },
      error: (error) => {
        console.error('Error al filtrar por año:', error);
        this.errorMessage = 'Error al filtrar por año';
      }
    });
  }

  filterByBrand() {
    if (!this.selectedBrand) {
      this.filteredCars = this.cars;
      return;
    }

    this.carService.filterCarsByBrand(this.selectedBrand).subscribe({
      next: (cars) => {
        this.filteredCars = cars;
      },
      error: (error) => {
        console.error('Error al filtrar por marca:', error);
        this.errorMessage = 'Error al filtrar por marca';
      }
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedYear = '';
    this.selectedBrand = '';
    this.filteredCars = this.cars;
  }

  showAddCarForm() {
    this.showAddForm = true;
    this.editingCar = null;
    this.resetForm();
  }

  editCar(car: Car) {
    this.editingCar = car;
    this.carForm = {
      brand: car.brand,
      model: car.model,
      year: car.year,
      licensePlate: car.licensePlate,
      color: car.color
    };
    this.showAddForm = true;
  }

  cancelForm() {
    this.showAddForm = false;
    this.editingCar = null;
    this.resetForm();
    this.selectedFile = null;
    this.previewUrl = null;
  }

  resetForm() {
    this.carForm = {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      color: ''
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveCar() {
    if (this.editingCar) {
      this.updateCar();
    } else {
      this.createCar();
    }
  }

  createCar() {
    this.isLoading = true;
    this.errorMessage = '';

    this.carService.createCar(this.carForm).subscribe({
      next: (car) => {
        this.cars.unshift(car);
        this.filteredCars = [...this.cars];
        
        // Si hay archivo seleccionado, subir foto
        if (this.selectedFile && car.id) {
          this.uploadPhoto(car.id);
        } else {
          this.cancelForm();
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error al crear carro:', error);
        this.errorMessage = 'Error al crear el carro';
        this.isLoading = false;
      }
    });
  }

  updateCar() {
    if (!this.editingCar?.id) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.carService.updateCar(this.editingCar.id, this.carForm).subscribe({
      next: (car) => {
        const index = this.cars.findIndex(c => c.id === car.id);
        if (index !== -1) {
          this.cars[index] = car;
          this.filteredCars = [...this.cars];
        }
        
        // Si hay archivo seleccionado, subir foto
        if (this.selectedFile && car.id) {
          this.uploadPhoto(car.id);
        } else {
          this.cancelForm();
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error al actualizar carro:', error);
        this.errorMessage = 'Error al actualizar el carro';
        this.isLoading = false;
      }
    });
  }

  uploadPhoto(carId: number) {
    if (!this.selectedFile) {
      this.cancelForm();
      this.isLoading = false;
      return;
    }

    this.carService.uploadCarPhoto(carId, this.selectedFile).subscribe({
      next: (response) => {
        // Actualizar la URL de la foto en la lista
        const car = this.cars.find(c => c.id === carId);
        if (car) {
          car.photoUrl = response.imageUrl;
        }
        this.cancelForm();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al subir foto:', error);
        this.errorMessage = 'Error al subir la foto';
        this.cancelForm();
        this.isLoading = false;
      }
    });
  }

  deleteCar(car: Car) {
    if (!car.id) return;
    
    if (confirm(`¿Estás seguro de que quieres eliminar el carro ${car.brand} ${car.model}?`)) {
      this.isLoading = true;
      
      this.carService.deleteCar(car.id).subscribe({
        next: () => {
          this.cars = this.cars.filter(c => c.id !== car.id);
          this.filteredCars = [...this.cars];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al eliminar carro:', error);
          this.errorMessage = 'Error al eliminar el carro';
          this.isLoading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  trackByCarId(index: number, car: Car): number | undefined {
    return car.id;
  }
}
