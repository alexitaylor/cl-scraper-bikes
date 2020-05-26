import { __decorate, __metadata } from "tslib";
import { CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryGeneratedColumn, } from 'typeorm';
export class Base extends BaseEntity {
}
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Base.prototype, "id", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Base.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Base.prototype, "updatedAt", void 0);
//# sourceMappingURL=base.entity.js.map