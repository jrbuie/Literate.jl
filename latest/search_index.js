var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "1. Introduction",
    "title": "1. Introduction",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#**1.**-Introduction-1",
    "page": "1. Introduction",
    "title": "1. Introduction",
    "category": "section",
    "text": "Welcome to the documentation for Literate – a simplistic package for Literate Programming."
},

{
    "location": "index.html#What?-1",
    "page": "1. Introduction",
    "title": "What?",
    "category": "section",
    "text": "Literate is a package that generate markdown pages (for e.g. Documenter.jl), and Jupyter notebooks, from the same source file. There is also an option to \"clean\" the source from all metadata, and produce a pure Julia script.The main design goal is simplicity. It should be simple to use, and the syntax should be simple. In short, all you have to do is to write a commented julia script!The public interface consists mainly of three functions, which all takes the same script file as input, but generates different output:Literate.markdown: generates a markdown file\nLiterate.notebook: generates an (optionally executed) notebook\nLiterate.script: generates a plain script file, removing all metadata and special syntax."
},

{
    "location": "index.html#Why?-1",
    "page": "1. Introduction",
    "title": "Why?",
    "category": "section",
    "text": "Examples are (probably) the best way to showcase your awesome package, and examples are often the best way for a new user to learn how to use it. It is therefore important that the documentation of your package contains examples for users to read and study. However, people are different, and we all prefer different ways of trying out a new package. Some people wants to RTFM, others want to explore the package interactively in, for example, a notebook, and some people wants to study the source code. The aim of Literate is to make it easy to give the user all of these options, while still keeping maintenance to a minimum.It is quite common that packages have \"example notebooks\" to showcase the package. Notebooks are great for showcasing a package, but they are not so great with version control, like git. The reason being that a notebook is a very \"rich\" format since it contains output and other metadata. Changes to the notebook thus result in large diffs, which makes it harder to review the actual changes.It is also common that packages include examples in the documentation, for example by using Documenter.jl @example-blocks. This is also great, but it is not quite as interactive as a notebook, for the users who prefer that.Literate tries to solve the problems above by creating the output as a part of the doc build. Literate generates the output based on a single source file which makes it easier to maintain, test, and keep the manual and your example notebooks in sync."
},

{
    "location": "fileformat.html#",
    "page": "2. File Format",
    "title": "2. File Format",
    "category": "page",
    "text": ""
},

{
    "location": "fileformat.html#**2.**-File-Format-1",
    "page": "2. File Format",
    "title": "2. File Format",
    "category": "section",
    "text": "The source file format for Literate is a regular, commented, julia (.jl) scripts. The idea is that the scripts also serve as documentation on their own and it is also simple to include them in the test-suite, with e.g. include, to make sure the examples stay up do date with other changes in your package."
},

{
    "location": "fileformat.html#Syntax-1",
    "page": "2. File Format",
    "title": "2.1. Syntax",
    "category": "section",
    "text": "The basic syntax is simple:lines starting with #\' is treated as markdown,\nall other lines are treated as julia code.The reason for using #\' instead of # is that we want to be able to use # as comments, just as in a regular script. Lets look at a simple example:#\' # Rational numbers\n#\'\n#\' In julia rational numbers can be constructed with the `//` operator.\n#\' Lets define two rational numbers, `x` and `y`:\n\nx = 1//3\ny = 2//5\n\n#\' When adding `x` and `y` together we obtain a new rational number:\n\nz = x + yIn the lines #\' we can use regular markdown syntax, for example the # used for the heading and the backticks for formatting code. The other lines are regular julia code. We note a couple of things:The script is valid julia, which means that we can include it and the example will run (for example in the test/runtests.jl script, to include the example in the test suite).\nThe script is \"self-explanatory\", i.e. the markdown lines works as comments and thus serve as good documentation on its own.For simple use this is all you need to know. The following additional special syntax can also be used:#md, #nb, #jl: tags for filtering of lines, see Filtering Lines.\n#-: tag for manually controlling chunk-splits, see Custom control over chunk splits.There is also some default convenience replacements that will always be performed, see Default Replacements."
},

{
    "location": "fileformat.html#Filtering-Lines-1",
    "page": "2. File Format",
    "title": "2.2. Filtering Lines",
    "category": "section",
    "text": "It is possible to filter out lines depending on the output format. For this purpose, there are three different \"tokens\" that can be placed on the start of the line:#md: markdown output only,\n#nb: notebook output only,\n#jl: script output only.Lines starting with one of these tokens are filtered out in the preprocessing step.Suppose, for example, that we want to include a docstring within a @docs block using Documenter. Obviously we don\'t want to include this in the notebook, since @docs is Documenter syntax that the notebook will not understand. This is a case where we can prepend #md to those lines:#md #\' ```@docs\n#md #\' Literate.markdown\n#md #\' Literate.notebook\n#md #\' Literate.markdown\n#md #\' ```The lines in the example above would be filtered out in the preprocessing step, unless we are generating a markdown file. When generating a markdown file we would simple remove the leading #md from the lines. Beware that the space after the tag is also removed."
},

{
    "location": "fileformat.html#Default-Replacements-1",
    "page": "2. File Format",
    "title": "2.3. Default Replacements",
    "category": "section",
    "text": "The following convenience \"macros\" are always expanded:@__NAME__\nexpands to the name keyword argument to Literate.markdown, Literate.notebook and Literate.script (defaults to the filename of the input file).\n@__REPO__ROOT_URL__\nexpands to https://github.com/$(ENV[\"TRAVIS_REPO_SLUG\"])/blob/master/ and is a convenient way to use when you want to link to files outside the doc-build directory. For example @__REPO__ROOT_URL__src/Literate.jl would link to the source of the Literate module.\n@__NBVIEWER_ROOT_URL__\nexpands to https://nbviewer.jupyter.org/github/$(ENV[\"TRAVIS_REPO_SLUG\"])/blob/gh-pages/$(folder)/ where folder is the folder that Documenter.deploydocs deploys too. This can be used if you want a link that opens the generated notebook in http://nbviewer.jupyter.org/."
},

{
    "location": "pipeline.html#",
    "page": "3. Processing pipeline",
    "title": "3. Processing pipeline",
    "category": "page",
    "text": ""
},

{
    "location": "pipeline.html#**3.**-Processing-pipeline-1",
    "page": "3. Processing pipeline",
    "title": "3. Processing pipeline",
    "category": "section",
    "text": "The generation of output follows the same pipeline for all output formats:Pre-processing\nParsing\nDocument generation\nPost-processing\nWriting to file"
},

{
    "location": "pipeline.html#Pre-processing-1",
    "page": "3. Processing pipeline",
    "title": "3.1. Pre-processing",
    "category": "section",
    "text": "The first step is pre-processing of the input file. The file is read to a String. The first processing step is to apply the user specified pre-processing function, see Custom pre- and post-processing.The next step is to perform all of the built-in default replacements. CRLF style line endings (\"\\r\\n\") are replaced with LF line endings (\"\\n\") to simplify internal processing. Next, line filtering is performed, see Filtering Lines, meaning that lines starting with #md, #nb or #jl are handled (either just the token itself is removed, or the full line, depending on the output target). The last pre-processing step is to expand the convenience \"macros\" described in Default Replacements is expanded."
},

{
    "location": "pipeline.html#Parsing-1",
    "page": "3. Processing pipeline",
    "title": "3.2. Parsing",
    "category": "section",
    "text": "After the preprocessing the file is parsed. The first step is to categorize each line and mark them as either markdown or code according to the rules described in the Syntax section. Lets consider the example from the previous section with each line categorized:#\' # Rational numbers                                                     <- markdown\n#\'                                                                        <- markdown\n#\' In julia rational numbers can be constructed with the `//` operator.   <- markdown\n#\' Lets define two rational numbers, `x` and `y`:                         <- markdown\n                                                                          <- code\nx = 1 // 3                                                                <- code\ny = 2 // 5                                                                <- code\n                                                                          <- code\n#\' When adding `x` and `y` together we obtain a new rational number:      <- markdown\n                                                                          <- code\nz = x + y                                                                 <- codeIn the next step the lines are grouped into \"chunks\" of markdown and code. This is done by simply collecting adjacent lines of the same \"type\" into chunks:#\' # Rational numbers                                                     ┐\n#\'                                                                        │\n#\' In julia rational numbers can be constructed with the `//` operator.   │ markdown\n#\' Lets define two rational numbers, `x` and `y`:                         ┘\n                                                                          ┐\nx = 1 // 3                                                                │\ny = 2 // 5                                                                │ code\n                                                                          ┘\n#\' When adding `x` and `y` together we obtain a new rational number:      ] markdown\n                                                                          ┐\nz = x + y                                                                 ┘ codeIn the last parsing step all empty leading and trailing lines for each chunk are removed, but empty lines within the same block are kept. The leading #\' tokens are also removed from the markdown chunks. Finally we would end up with the following 4 chunks:Chunks #1:# Rational numbers\n\nIn julia rational numbers can be constructed with the `//` operator.\nLets define two rational numbers, `x` and `y`:Chunk #2:x = 1 // 3\ny = 2 // 5Chunk #3:When adding `x` and `y` together we obtain a new rational number:Chunk #4:z = x + yIt is then up to the Document generation step to decide how these chunks should be treated."
},

{
    "location": "pipeline.html#Custom-control-over-chunk-splits-1",
    "page": "3. Processing pipeline",
    "title": "Custom control over chunk splits",
    "category": "section",
    "text": "Sometimes it is convenient to be able to manually control how the chunks are split. For example, if you want to split a block of code into two, such that they end up in two different @example blocks or notebook cells. The #- token can be used for this purpose. All lines starting with #- are used as \"chunk-splitters\":x = 1 // 3\ny = 2 // 5\n#-\nz = x + yThe example above would result in two consecutive code-chunks.tip: Tip\nThe rest of the line, after #-, is discarded, so it is possible to use e.g. #------------- as a chunk splitter, which may make the source code more readable."
},

{
    "location": "pipeline.html#Document-generation-1",
    "page": "3. Processing pipeline",
    "title": "3.3. Document generation",
    "category": "section",
    "text": "After the parsing it is time to generate the output. What is done in this step is very different depending on the output target, and it is describe in more detail in the Output format sections: Markdown Output, Notebook Output and Script Output. In short, the following is happening:Markdown output: markdown chunks are printed as-is, code chunks are put inside a code fence (defaults to @example-blocks),\nNotebook output: markdown chunks are printed in markdown cells, code chunks are put in code cells,\nScript output: markdown chunks are discarded, code chunks are printed as-is."
},

{
    "location": "pipeline.html#Post-processing-1",
    "page": "3. Processing pipeline",
    "title": "3.4. Post-processing",
    "category": "section",
    "text": "When the document is generated the user, again, has the option to hook-into the generation with a custom post-processing function. The reason is that one might want to change things that are only visible in the rendered document. See Custom pre- and post-processing."
},

{
    "location": "pipeline.html#Writing-to-file-1",
    "page": "3. Processing pipeline",
    "title": "3.5. Writing to file",
    "category": "section",
    "text": "The last step of the generation is writing to file. The result is written to $(outputdir)/$(name)(.md|.ipynb|.jl) where outputdir is the output directory supplied by the user (for example docs/generated), and name is a user supplied filename. It is recommended to add the output directory to .gitignore since the idea is that the generated documents will be generated as part of the build process rather than beeing files in the repo."
},

{
    "location": "outputformats.html#",
    "page": "4. Output Formats",
    "title": "4. Output Formats",
    "category": "page",
    "text": ""
},

{
    "location": "outputformats.html#Output-Formats-1",
    "page": "4. Output Formats",
    "title": "4. Output Formats",
    "category": "section",
    "text": "When the source is parsed, and have been processed it is time to render the output. We will consider the following source snippet:#\' # Rational numbers\n#\'\n#\' In julia rational numbers can be constructed with the `//` operator.\n#\' Lets define two rational numbers, `x` and `y`:\n\nx = 1//3\n#-\ny = 2//5\n\n#\' When adding `x` and `y` together we obtain a new rational number:\n\nz = x + yand see how this is rendered in each of the output formats."
},

{
    "location": "outputformats.html#Literate.markdown",
    "page": "4. Output Formats",
    "title": "Literate.markdown",
    "category": "function",
    "text": "Literate.markdown(inputfile, outputdir; kwargs...)\n\nGenerate a markdown file from inputfile and write the result to the directoryoutputdir.\n\nKeyword arguments:\n\nname: name of the output file, excluding .md. name is also used to name all the @example blocks, and to replace @__NAME__. Defaults to the filename of inputfile.\npreprocess, postprocess: custom pre- and post-processing functions, see the Custom pre- and post-processing section of the manual. Defaults to identity.\ndocumenter: boolean that tells if the output is intended to use with Documenter.jl. Defaults to true. See the the manual section on Interaction with Documenter.\ncodefence: A Pair of opening and closing code fence. Defaults to\n\"```@example $(name)\" => \"```\"\nif documenter = true and\n\"```julia\" => \"```\"\nif documenter = false.\n\n\n\n"
},

{
    "location": "outputformats.html#Markdown-Output-1",
    "page": "4. Output Formats",
    "title": "4.1. Markdown Output",
    "category": "section",
    "text": "The (default) markdown output of the source snippet above is as follows# Rational numbers\n\nIn julia rational numbers can be constructed with the `//` operator.\nLets define two rational numbers, `x` and `y`:\n\n```@example name\nx = 1//3\n```\n\n```@example name\ny = 2//5\n```\n\nWhen adding `x` and `y` together we obtain a new rational number:\n\n```@example name\nz = x + y\n```We note that lines starting with #\' is printed as regular markdown, and the code lines have been wrapped in @example blocks.Some of the output rendering can be controlled with keyword arguments to Literate.markdown:Literate.markdown"
},

{
    "location": "outputformats.html#Literate.notebook",
    "page": "4. Output Formats",
    "title": "Literate.notebook",
    "category": "function",
    "text": "Literate.notebook(inputfile, outputdir; kwargs...)\n\nGenerate a notebook from inputfile and write the result to outputdir.\n\nKeyword arguments:\n\nname: name of the output file, excluding .ipynb. name is also used to replace @__NAME__. Defaults to the filename of inputfile.\npreprocess, postprocess: custom pre- and post-processing functions, see the Custom pre- and post-processing section of the manual. Defaults to identity.\nexecute: a boolean deciding if the generated notebook should also be executed or not. Defaults to true. The current working directory is set to outputdir when executing the notebook.\ndocumenter: boolean that says if the source contains Documenter.jl specific things to filter out during notebook generation. Defaults to true. See the the manual section on Interaction with Documenter.\n\n\n\n"
},

{
    "location": "outputformats.html#Notebook-Output-1",
    "page": "4. Output Formats",
    "title": "4.2. Notebook Output",
    "category": "section",
    "text": "The (default) notebook output of the source snippet above is as follows        │ # Rational numbers\n        │\n        │ In julia rational numbers can be constructed with the `//` operator.\n        │ Lets define two rational numbers, `x` and `y`:\n\nIn[1]:  │ x = 1//3\nOut[1]: │ 1//3\n\nIn[2]:  │ y = 2//5\nOut[2]: │ 2//5\n\n        │ When adding `x` and `y` together we obtain a new rational number:\n\nIn[3]:  │ z = x + y\nOut[3]: │ 11/15We note that lines starting with #\' is put in markdown cells, and the code lines have been put in code cells. By default the notebook is also executed and output cells populated. The current working directory is set to the specified output directory the notebook is executed. Some of the output rendering can be controlled with keyword arguments to Literate.notebook:Literate.notebook"
},

{
    "location": "outputformats.html#Literate.script",
    "page": "4. Output Formats",
    "title": "Literate.script",
    "category": "function",
    "text": "Literate.script(inputfile, outputdir; kwargs...)\n\nGenerate a plain script file from inputfile and write the result to outputdir.\n\nKeyword arguments:\n\nname: name of the output file, excluding .jl. name is also used to replace @__NAME__. Defaults to the filename of inputfile.\npreprocess, postprocess: custom pre- and post-processing functions, see the Custom pre- and post-processing section of the manual. Defaults to identity.\ndocumenter: boolean that says if the source contains Documenter.jl specific things to filter out during script generation. Defaults to true. See the the manual section on Interaction with Documenter.\nkeep_comments: boolean that, if set to true, keeps markdown lines (#\') as comments in the output script. Defaults to false.\n\n\n\n"
},

{
    "location": "outputformats.html#Script-Output-1",
    "page": "4. Output Formats",
    "title": "4.3. Script Output",
    "category": "section",
    "text": "The (default) script output of the source snippet above is as followsx = 1//3\n\ny = 2//5\n\nz = x + yWe note that lines starting with #\' are removed and only the code lines have been kept. Some of the output rendering can be controlled with keyword arguments to Literate.script:Literate.script"
},

{
    "location": "customprocessing.html#",
    "page": "5. Custom pre- and post-processing",
    "title": "5. Custom pre- and post-processing",
    "category": "page",
    "text": ""
},

{
    "location": "customprocessing.html#Custom-pre-and-post-processing-1",
    "page": "5. Custom pre- and post-processing",
    "title": "5. Custom pre- and post-processing",
    "category": "section",
    "text": "Since all packages are different, and may have different demands on how to create a nice example for the documentation it is important that the package maintainer does not feel limited by the by default provided syntax that this package offers. While you can generally come a long way by utilizing line filtering there might be situations where you need to manually hook into the generation and change things. In Literate this is done by letting the user supply custom pre- and post-processing functions that may do transformation of the content.All of the generators (Literate.markdown, Literate.notebook and Literate.script) accepts preprocess and postprocess keyword arguments. The default \"transformation\" is the identity function. The input to the transformation functions is a String, and the output should be the transformed String.preprocess is sent the raw input that is read from the source file (modulo the default line ending transformation). postprocess is given different things depending on the output: For markdown and script output postprocess is given the content String just before writing it to the output file, but for notebook output postprocess is given the dictionary representing the notebook, since, in general, this is more useful.As an example, lets say we want to splice the date of generation into the output. We could of course update our source file before generating the docs, but we could instead use a preprocess function that splices the date into the source for us. Consider the following source file:#\' # Example\n#\' This example was generated DATEOFTODAY\n\nx = 1 // 3where DATEOFTODAY is a placeholder, to make it easier for our preprocess function to find the location. Now, lets define the preprocess function, for examplefunction update_date(content)\n    content = replace(content, \"DATEOFTODAY\" => Date(now()))\n    return content\nendwhich would replace every occurrence of \"DATEOFTODAY\" with the current date. We would now simply give this function to the generator, for example:Literate.markdown(\"input.jl\", \"outputdir\"; preprocess = update_date)"
},

{
    "location": "documenter.html#",
    "page": "6. Interaction with Documenter.jl",
    "title": "6. Interaction with Documenter.jl",
    "category": "page",
    "text": ""
},

{
    "location": "documenter.html#Interaction-with-Documenter-1",
    "page": "6. Interaction with Documenter.jl",
    "title": "6. Interaction with Documenter.jl",
    "category": "section",
    "text": "Literate can be used for any purpose, it spits out regular markdown files, and notebooks. Typically, though, these files will be used to render documentation for your package. The generators (Literate.markdown, Literate.notebook and Literate.script) supports a keyword argument documenter that lets the generator perform some extra things, keeping in mind that the source code have been written with Documenter.jl in mind. So lets take a look at what will happen if we set documenter = true:"
},

{
    "location": "documenter.html#[Literate.markdown](@ref):-1",
    "page": "6. Interaction with Documenter.jl",
    "title": "Literate.markdown:",
    "category": "section",
    "text": "The default code fence will change from\n```julia\n# code\n```\nto Documenters @example blocks:\n```@examples $(name)\n# code\n```\nThe following @meta block will be added to the top of the markdown page, which redirects the \"Edit on GitHub\" link on the top of the page to the source file rather than the generated .md file:\n```@meta\nEditURL = \"$(relpath(inputfile, outputdir))\"\n```"
},

{
    "location": "documenter.html#[Literate.notebook](@ref):-1",
    "page": "6. Interaction with Documenter.jl",
    "title": "Literate.notebook:",
    "category": "section",
    "text": "Documenter style @refs and @id will be removed. This means that you can use @ref and @id in the source file without them leaking to the notebook.\nDocumenter style markdown math\n```math\n\\int f dx\n```\nis replaced with notebook compatible\n\\begin{equation}\n\\int f dx\n\\end{equation}"
},

{
    "location": "documenter.html#[Literate.script](@ref):-1",
    "page": "6. Interaction with Documenter.jl",
    "title": "Literate.script:",
    "category": "section",
    "text": "Documenter style @refs and @id will be removed. This means that you can use @ref and @id in the source file without them leaking to the script."
},

{
    "location": "generated/example.html#",
    "page": "7. Example",
    "title": "7. Example",
    "category": "page",
    "text": "EditURL = \"https://github.com/fredrikekre/Literate.jl/blob/master/examples/example.jl\""
},

{
    "location": "generated/example.html#**7.**-Example-1",
    "page": "7. Example",
    "title": "7. Example",
    "category": "section",
    "text": "This is an example generated with Literate based on this source file: example.jl. You are seeing the html-output which Documenter have generated based on a markdown file generated with Literate. The corresponding notebook can be found here: example.ipynb, and the plain script output can be found here: example.jl.It is recommended to have the source file available when reading this, to better understand how the syntax in the source file corresponds to the output you are seeing."
},

{
    "location": "generated/example.html#Basic-syntax-1",
    "page": "7. Example",
    "title": "Basic syntax",
    "category": "section",
    "text": "The basic syntax for Literate is simple, lines starting with #\' is interpreted as markdown, and all the other lines are interpreted as code. Here is some code:x = 1//3\ny = 2//5In markdown sections we can use markdown syntax. For example, we can write text in italic font, text in bold font and use links.It is possible to filter lines by starting it with #md, #nb or #jl for markdown, notebook and script output only, respectively. This line is filtered out for notebook and script output.The source file is parsed in chunks of markdown and code. Starting a line with #- manually inserts a chunk break. For example, if we want to display the output of the following operations we may insert #- in between. These two code blocks will now end up in different @example-blocks in the markdown output, and two different notebook cells in the notebook output.x + yx * y"
},

{
    "location": "generated/example.html#Custom-processing-1",
    "page": "7. Example",
    "title": "Custom processing",
    "category": "section",
    "text": "It is possible to give Literate custom pre- and post-processing functions. For example, here we insert two placeholders, which we will replace with something else at time of generation. We have here replaced our placeholders with z and 1.0 + 2.0im:z = 1.0 + 2.0im"
},

{
    "location": "generated/example.html#documenter-interaction-1",
    "page": "7. Example",
    "title": "Documenter.jl interaction",
    "category": "section",
    "text": "In the source file it is possible to use Documenter.jl style references, such as @ref and @id. These will be filtered out in the notebook output. For example, here is a link, but it is only visible as a link if you are reading the markdown output. We can also use equations:int f(x) dxusing Documenters math syntax. This is automatically changed to \\begin{equation} ... \\end{equation} in the notebook output to display correctly in the notebook too."
},

]}
