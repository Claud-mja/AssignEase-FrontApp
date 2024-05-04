
export const sideBarMenu =  [
    {
        "title" : "Auteur",
        "icon": "gauge-high",
        "routerLink": "/student"
    },
    {
        "title" : "Biens",
        "icon": "gauge-high",
        "children": [
            {
                "title": "Create Bien",
                "icon": "newspaper",
                "routerLink": "/bien/create"
            },
            {
                "title": "List Biens",
                "icon": "layer-group",
                "routerLink": "/bien/list"
            }
        ]
    },
    {
        "title": "Location",
        "icon": "scroll",
        "children": [
            {
                "title": "Create Locataire",
                "icon": "newspaper",
                "routerLink": "/location/create"
            },
            {
                "title": "List Locataires",
                "icon": "layer-group",
                "routerLink": "/location/list"
            }
        ]
    }
]