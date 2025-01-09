interface permInter{
    name: string
}

const getPermissions = () => {
    const jsonPerms = JSON.parse(localStorage.getItem('perms') || '[]') as permInter[];
    const perms = jsonPerms.map((perm: { name: string }) => perm.name);

    return perms;
};

export default getPermissions;