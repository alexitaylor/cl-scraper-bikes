import { __decorate, __metadata } from "tslib";
import { Entity, Column, } from 'typeorm';
import { Base } from './base.entity';
let UsersEntity = class UsersEntity extends Base {
};
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "title", void 0);
__decorate([
    Column({ type: 'text', unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "pageUrl", void 0);
__decorate([
    Column({
        type: 'text',
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "dateTime", void 0);
__decorate([
    Column({
        type: 'text',
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "geoLocation", void 0);
UsersEntity = __decorate([
    Entity('bikePosting')
], UsersEntity);
export { UsersEntity };
//# sourceMappingURL=bikePostings.entity.js.map