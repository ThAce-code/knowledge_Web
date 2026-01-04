import { useEffect } from 'react';

/**
 * CodeBlockEnhancer - Client-side component that enhances all <pre><code> blocks
 * Adds macOS-style header bar with three dots, language label and copy button
 */
export function CodeBlockEnhancer() {
  useEffect(() => {
    // Use a small delay to ensure dangerouslySetInnerHTML has rendered
    const timeoutId = setTimeout(() => {
      enhanceCodeBlocks();
    }, 100);

    // Also set up a MutationObserver to catch any dynamically added code blocks
    const observer = new MutationObserver(() => {
      enhanceCodeBlocks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      cleanupEnhancements();
    };
  }, []);

  return null;
}

function enhanceCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code.hljs');

  codeBlocks.forEach((codeElement) => {
    const preElement = codeElement.parentElement;
    if (!preElement || preElement.dataset.enhanced === 'true') return;

    // Mark as enhanced to avoid duplicate processing
    preElement.dataset.enhanced = 'true';

    // Extract language from class (e.g., "language-javascript" -> "javascript")
    const languageClass = Array.from(codeElement.classList).find(cls =>
      cls.startsWith('language-')
    );
    const language = languageClass
      ? languageClass.replace('language-', '').toUpperCase()
      : 'CODE';

    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    // Create header bar
    const header = document.createElement('div');
    header.className = 'code-block-header';

    // macOS window controls (left side)
    const windowControls = document.createElement('div');
    windowControls.className = 'code-block-window-controls';
    windowControls.innerHTML = `
      <div class="window-control-dot window-control-red"></div>
      <div class="window-control-dot window-control-yellow"></div>
      <div class="window-control-dot window-control-green"></div>
    `;

    // Right side container (language + copy button)
    const rightContainer = document.createElement('div');
    rightContainer.className = 'code-block-right-container';

    // Language label
    const languageLabel = document.createElement('span');
    languageLabel.className = 'code-block-language';
    languageLabel.textContent = language;

    // Copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-block-copy-button';
    copyButton.setAttribute('aria-label', 'Copy code');
    copyButton.innerHTML = `
      <svg class="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <svg class="check-icon hidden" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    // Copy functionality
    copyButton.addEventListener('click', async () => {
      const code = codeElement.textContent || '';
      try {
        await navigator.clipboard.writeText(code);

        // Show success state
        const copyIcon = copyButton.querySelector('.copy-icon');
        const checkIcon = copyButton.querySelector('.check-icon');

        if (copyIcon && checkIcon) {
          copyIcon.classList.add('hidden');
          checkIcon.classList.remove('hidden');
          copyButton.classList.add('copied');
        }

        // Reset after 2 seconds
        setTimeout(() => {
          if (copyIcon && checkIcon) {
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
            copyButton.classList.remove('copied');
          }
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    });

    // Assemble header
    rightContainer.appendChild(languageLabel);
    rightContainer.appendChild(copyButton);
    header.appendChild(windowControls);
    header.appendChild(rightContainer);

    // Wrap pre element
    preElement.parentNode?.insertBefore(wrapper, preElement);
    wrapper.appendChild(header);
    wrapper.appendChild(preElement);
  });
}

function cleanupEnhancements() {
  document.querySelectorAll('.code-block-wrapper').forEach(wrapper => {
    const pre = wrapper.querySelector('pre');
    if (pre) {
      wrapper.parentNode?.insertBefore(pre, wrapper);
      wrapper.remove();
      pre.dataset.enhanced = 'false';
    }
  });
}
