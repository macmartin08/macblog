const Blog = require('../models/blog');

exports.index = (req, res) => {
	Blog.find()
    .then(blogs => {
      res.render('blogs/index', {
        blogs: blogs,
        title: 'Archive'
      });
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
    });
}


exports.show = (req, res) => {
	Blog.findById(req.params.id)
    .then(blog => {
      res.render('blogs/show', {
        blog: blog,
        title: blog.title
      });
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
    });
}


exports.drafts = (req, res) => {
	Blog.find().drafts()
    .then(drafts => {
      res.render('blogs/index', {
        blogs: drafts,
        title: 'Drafts'
      });
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
    });
}


exports.published = (req, res) => {
	Blog.find().published()
    .then(published => {
      res.render('blogs/index', {
        blogs: published,
        title: 'Published'
      });
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
    });
}


exports.new = (req, res) => {
	res.render('blogs/new', {
    title: `New Blog Post`
  });
}


exports.create = (req, res) => {
	Blog.create(req.body.blog)
    .then(() => {
      req.flash('success', 'New blog was created successfully.');
      res.redirect('/blogs');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/blogs/new');
    });
}

exports.edit = (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      res.render('blogs/edit', {
        title: `Edit ${blog.title}`,
        blog: blog
      })
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
    });
};


exports.update = (req, res) => {
  Blog.updateOne({
      _id: req.body.id
    }, req.body.blog, {
      runValidators: true
    })
    .then(() => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
    });
};


exports.destroy = (req, res) => {
  Blog.deleteOne({
      _id: req.body.id
    })
    .then(() => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
    });
};