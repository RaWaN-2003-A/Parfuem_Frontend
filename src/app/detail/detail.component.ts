import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // نحتاج ActivatedRoute لقراءة الـ ID
import { BackendService } from '../shared/backend.service';
import { Parfuem } from '../shared/parfuem';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css' // يمكنك نسخ نفس أكواد الـ CSS من الـ create لاحقاً
})
export class DetailComponent implements OnInit {
  id: string = '';
  // كائن لتخزين بيانات العطر القديمة
  parfuem: Parfuem = { name: '', marke: '', preis: 0 };

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private router: Router
  ) {}

  async ngOnInit() {
    // 1. قراءة الـ ID الخاص بالعطر من الرابط (URL)
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      // 2. جلب بيانات العطر وتعبئتها في الفورم
      this.parfuem = await this.backendService.getOne(this.id);
    }
  }

  // دالة تُستدعى عند الضغط على زر التحديث
  async aktualisieren() {
    try {
      await this.backendService.update(this.id, this.parfuem);
      this.router.navigate(['/table']); // العودة للجدول بعد التعديل
    } catch (error) {
      console.error('حدث خطأ أثناء التعديل:', error);
    }
  }
}