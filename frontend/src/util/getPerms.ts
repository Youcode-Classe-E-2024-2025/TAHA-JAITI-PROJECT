interface permInter{
    name: string
}

const getPermissions = () => {
    const jsonPerms = JSON.parse(localStorage.getItem('perms') || '[]') as permInter[];
    const perms = jsonPerms ? jsonPerms.map((perm: { name: string }) => perm.name) : 'none';

    return perms;
};

export default getPermissions;