export function badRequest(res){
    res.status(400).json({
        error: true,
        message: {
            tm: 'Ýalňyşlyk ýüze çykdy',
            en: 'Something went wrong',
            ru: 'Что-то пошло не так'
        },
        body: null
    })
}