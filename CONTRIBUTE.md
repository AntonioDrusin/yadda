### Features & documentation

There is a common set of features shared by all cucumber implementations. It's called the *Technology Compatibility Kit* or *TCK*. Find more on the [Cucumber TCK](http://github.com/cucumber/cucumber-tck) repository.

The official way of running them is through Cucumber-ruby. Ruby and Bundler are required for this to work.

You will need to install error and link? for npm:
    $ npm --loglevel error link

And then get the tck and run:
    $ git submodule update --init
    $ bundle
    $ cucumber features/cucumber-tck -r features
    
If you want to run one feature only, for example core:
    $ cucumber features/cucumber-tck/core.feature -r features
