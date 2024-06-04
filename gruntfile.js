module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),         // Abaixo estão as configurações do plugins do Grunt
        less: {
            development: {       //develompment(desenvolvimento) é um ambiente padrão. A Vercel é um ambiente de produção.
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {         // Produção
                options: {
                    compress: true,
        },
                files: {
                'dist/styles/main.min.css': 'src/styles/main.less' //Aqui temos os arquivos de saida e entrada respectivamente
                }
            }
        },
        watch: {
            less: {
                files:['src/styles/**/*.less'], // Os arterísticos duplos significam acessar qualquer pasta dentro da pasta styles e o simples qualquer arquivo dentro da pasta styles.
                tasks: ['less:development']     // Aqui são as tarefas que serão execultadas quando ouver modificação na regra acima
        },
        html: {
            files: ['src/index.html'],
            tasks: ['replace:dev']
        }
        },
        replace: {
            dev: {             // Vamos apontar para o desenvolvimento
                options: {
                    patterns: [
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {             // Vamos apontar para o desenvolvimento
                options: {
                    patterns: [
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild']
    })

   

    grunt.loadNpmTasks('grunt-contrib-less');   // Esses são os pacotes instalados
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('default', ['watch']);  // Quando executarmos "npm run grunt" é essa seção que será executada
    grunt.registerTask('build', ['less:production','htmlmin:dist', 'replace:dist', 'clean' ]); // Aqui executaremos o grunt build
}


