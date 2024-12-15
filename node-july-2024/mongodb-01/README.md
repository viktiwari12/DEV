# Mongodb Assignment

You have to create a fully CRUD supported application

Blogging Application

```
{
    _id
    title: String
    slug: Unique (url) getting-started-docker
    body
    author
    created
    updated
    isActive: true Soft Delete
}

```

1. CRUD
2. Support for Soft Delete
3. Support for adding number of views on a blog
4. Add support for comments in blog
5. if blog contains some abusive or bad words, return 400
6. store the ip address of the user when creating blog and coments
7. for views, users can see views based on ip address. example: ip 1.2.3.4 viewd a blog for 10 times, 1.1.1.1 viewed for 1 time.
8. Implement Rate Limiting on creating and commenting blogs
9. A particular ip cannot view a partiular blog more than 10 times.
