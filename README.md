# TLCJS

These are the sources used to build the second edition of Eloquent
JavaScript (http://eloquentjavascript.net).

We're slowly writing it.

Feedback welcome, in the form of issues and pull requests.

## Writing with AsciiDoc

AsciiDoc is a form of markup. It has a [user guide](http://asciidoc.org/userguide.html) for more 
information than you could possibly want.

Here are some useful things:

```
[source,javascript]
----
// javascript that you can run within the book
----
```

```
[NOTE]
.A heading for the note
==================
An indented note
==================
```

Haven't tried this one yet:

```
.An Example Sidebar
************************************************
Any AsciiDoc SectionBody element (apart from
SidebarBlocks) can be placed inside a sidebar.
************************************************
```

## Eloquent Javascript-specific Markup

This is for "markup" that isn't in the AsciiDoc documentation, but 
has been added just to EJS.

```
!! hint !!

A hint that will be hidden unless the reader clicks on it. (Good 
for tricky exercises!)

!! hint !!
```

## Building

    npm install --production
    apt-get install asciidoc inkscape
    make html

For OSX, you can use port or brew to install the asciidoc package.

To build the PDF file:

    apt-get install texlive texlive-xetex texlive-fonts-extra
    make book.pdf

To build the ePub book:

    make book.epub
