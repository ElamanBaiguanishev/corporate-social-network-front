export enum RoleTypes {
    ADMIN = 'ADMIN',
    DEPUTY = 'DEPUTY',
    MANAGER = 'MANAGER'
}

export const roleTypeTranslations: { [key in RoleTypes]: string } = {
    [RoleTypes.ADMIN]: 'Администратор',
    [RoleTypes.DEPUTY]: 'Заместитель',
    [RoleTypes.MANAGER]: 'Менеджер',
};
